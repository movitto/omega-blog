xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "The Omega Project Blog"
    xml.description "The Omega Project Blog"
    xml.link "http://blog.omegaverse.info"
    xml.author { xml.name "Blog Author" }
    xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?

    blog.articles[0..5].each do |article|
      article_url = URI.join("http://blog.omegaverse.info/posts/", article.url)

      xml.item do
        xml.title article.title
        xml.link article_url
        xml.pubDate article.date.to_time.iso8601
        xml.guid article_url
        xml.description article.summary, "type" => "html"
        #xml.content article.body, "type" => "html"
      end
    end
  end
end
