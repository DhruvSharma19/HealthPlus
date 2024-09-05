from Accounts.models import symptoms_diseases, Predicted_Diseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv
from django.db import transaction
import os

svm_model = None

def scale_dataset(dataframe, oversample=False):
    if dataframe.empty:
        print("Warning: DataFrame is empty.")
        return None, None, None
    
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    if oversample:
        ros = RandomOverSampler()
        X, y = ros.fit_resample(X, y)

    data = np.hstack((X, np.reshape(y, (-1, 1))))

    return data, X, y


def train_svm_model():
    global svm_model
    data = pd.DataFrame.from_records(symptoms_diseases.objects.all().values())
    if 'id' in data.columns:
        data.drop('id', axis=1, inplace=True)

    train, X, Y = scale_dataset(data, oversample=True)

    svm_model = SVC(probability=True)
    svm_model.fit(X, Y)

train_svm_model()  # Initialize SVM model during server startup

@api_view()
def predict(request, symptoms=''):
    if not svm_model:
        train_svm_model()  # Re-train model if not initialized

    x = np.fromstring(symptoms, dtype=int, sep=',')
    x = x[1:].reshape(1, -1)  # Exclude first element (assuming it's a label)

    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x)

    Y_ = svm_model.predict(x_scaled)

    probas = svm_model.predict_proba(x_scaled)

    top5_indices = np.argsort(probas, axis=1)[:, -5:]
    top5_values = np.take_along_axis(probas, top5_indices, axis=1)

    top5_labels = svm_model.classes_[top5_indices]

    # Format results
    pd = top5_labels[0][::-1].tolist()  # Reverse to get highest probability first
    pd_prob = top5_values[0][::-1].astype(float).tolist()

    Predicted_Diseases.objects.all().delete()
    Predicted_Diseases(diseases=pd, diseases_prob=pd_prob).save()
    
    data = Predicted_Diseases.objects.all()
    serializer = PredictionSerializer(data, many=True)
    return Response(serializer.data)
