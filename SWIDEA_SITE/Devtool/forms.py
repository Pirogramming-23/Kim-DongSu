from django import forms
from .models import Devtool

class DevtoolForm(forms.ModelForm):
    class Meta:
        model = Devtool
        fields = ['name', 'kind', 'content']
        labels = {
            'name' : '이름:',
            'kind' : '종류:',
            'content' : '개발툴 설명'
        }