require 'open-uri'
require 'hpricot'

namespace :gmtc do
  task :get_data => :environment do
    url_prefix = 'http://gmtc.geekbang.org/'
    link = 'http://gmtc.geekbang.org/'
    doc = Hpricot(open(link))

    banner = url_prefix + doc.search('.header1 img').first.attributes['src']
    introdution = doc.search('.introdution').first.innerText
    puts banner, introdution

    author_avatars = {}

    puts '=============== CO-CHAIRS ================'
    co_chairs, speackers = doc.search('.xig')
    co_chairs = co_chairs.search('.hud')
    co_chairs.each do |chair|
      avatar = url_prefix + chair.search('.on_list img').first.attributes['src']
      name = chair.search('.onea b').first.innerText.strip
      company = chair.search('span')[1].innerText.gsub(/  +/, '')
      dids = chair.search('.dids').first.innerText
      puts avatar, name, company, dids, '===================='
      author_avatars[name]= avatar
    end

    puts '=============== SPEAKERS ================='
    speackers = speackers.search('.hud')
    speackers.each do |speacker|
      avatar = url_prefix + speacker.search('.on_list img').first.attributes['src']
      name = speacker.search('.onea b').first.innerText.strip
      company = speacker.search('span')[1].innerText.gsub(/  +/, '')
      dids = speacker.search('.dids').first.innerText
      puts avatar, name, company, dids, '===================='
      author_avatars[name]= avatar
    end

    puts '=============== SCHEDULE ================='
    days = doc.search('.big_list li')
    room = nil
    days.each_with_index do |day_dom, index|
      p index
      day_name = ['第一天', '第二天'][index]
      day = Day.find_or_create_by!(name: day_name)
      puts "============ Add #{day_name} ========="

      lines = day_dom.search('table tr')[1..-1]
      lines.each do |line|
        if line.attributes['class'] == 'onetr'
          room_name, room_desc = line.search('.td12').first.innerText.lines.map(&:strip)
          puts "======= Add room: #{room_name} ========"
          room = day.rooms.find_or_create_by!(name: room_name, description: room_desc)
        else
          time_range, title, author =
          line.search('.td12').map(&:innerText).map do |item|
            item.gsub(/  +/, '')
          end

          next unless time_range

          title, *desc = title.lines.map(&:strip)
          desc = desc.join('\n')
          puts "======= Add topic: #{title} ========"

          author_info = nil
          if author
            author, *author_info = author.lines.map(&:strip)
            author_info = author_info.join('\n') if author_info
          end

          rest = title == '茶歇' || title == '短休'
          start_at, end_at = time_range.split('～')
          authors = author ? author.gsub(/\([^\)]+\)/, '').gsub(/（[^）]+）/, '').split('、') : []
          avatars = authors.map{|a| author_avatars[a]}.select{|e| !e.nil?}

          Topic.create!(
            day: day,
            room: room,
            author: author,
            author_info: author_info,
            author_avatars: avatars,
            title: title,
            rest: rest,
            description: desc,
            start_at: start_at,
            end_at: end_at
          )
        end
      end
    end
  end
end
