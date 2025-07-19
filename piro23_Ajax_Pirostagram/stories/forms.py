from django import forms

class StoryForm(forms.Form):
    images = forms.FileField(
        widget=forms.FileInput(attrs={'multiple': True}),
        required=True
    )
