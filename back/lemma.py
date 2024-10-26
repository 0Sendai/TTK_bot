#import pymorphy2
from typing import Iterable
from pymystem3 import Mystem


m = Mystem()

def lemmatize_text(text: str):
    # Разбиваем текст на слов
    
    # Лемматизируем каждое слово и объединяем их в строку через пробел
    lemmatized = m.lemmatize(text)
    for item in lemmatized:
        if item in ', !?.\n': lemmatized.pop(lemmatized.index(item))
    return lemmatized


def check_keywords(keywords: Iterable[str] , text: str):
    # Лемматизируем строку для проверки с помощью pymorphy2
    #morph = pymorphy2.MorphAnalyzer()
    lemmatized_text = lemmatize_text(text)

    count = 0
    # Проверяем, содержится ли хотя бы одно из ключевых слов в лемматизированной строке
    for keyword in keywords:
        if count >= 2: return True
        if keyword in lemmatized_text:
            count += 1
    return False
