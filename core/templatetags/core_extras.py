from django import template

register = template.Library()

@register.filter
def lookup(dictionary, key):
    """Look up a dictionary value by key"""
    return dictionary.get(key, False)
