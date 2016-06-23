json.rooms @rooms
json.days @days do |day|
  json.extract! day, *day.attribute_names
  json.topics day.topics
end
