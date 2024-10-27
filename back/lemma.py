import spacy
from typing import Iterable, Mapping
# Загружаем модель для русского языка
nlp = spacy.load("ru_core_news_sm")

# Словарь намерений
intent_dict = {
    "список тарифов": "select_tariff",
    "список услуг": "select_service",
    "подключить тариф": "add_tariff",
    "сменить тариф": "change_tariff",
    "подключить услугу": "add_service",
    "удалить услугу": "remove_service"
}

def lemmatize_text(text):
    # Обрабатываем текст с помощью SpaCy
    doc = nlp(text)
    # Лемматизируем слова и возвращаем их в виде строки
    return ' '.join(token.lemma_ for token in doc)

def find_intent(text: str, keywords_items: Iterable[Mapping[int,str]]) -> int:
    lemmatized_text = lemmatize_text(text)
    count = 0
    # Проверяем на наличие ключевых слов в лемматизированном тексте
    for keywords in keywords_items:
        count = 0
        for id, keywords in keywords_items:
            for keyword in keywords:
                if count >= 2: return id
                if keyword in lemmatized_text: count += 1

    return None
