json.days @days do |day|
  json.extract! day, *day.attribute_names
  json.rooms day.rooms do |room|
    json.extract! room, *room.attribute_names
    json.topics room.topics
  end
end
