from django import forms
from .models import Profiles

class ProfileForm(forms.ModelForm):
    first_name=forms.CharField(max_length=50)
    last_name=forms.CharField(max_length=50)
    email=forms.CharField(max_length=50)

    class Meta:
        model=Profiles
        fields=['location','bio']