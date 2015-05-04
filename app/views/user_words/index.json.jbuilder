json.array!(@user_words) do |user_word|
  json.extract! user_word, :id
  json.url user_word_url(user_word, format: :json)
end
