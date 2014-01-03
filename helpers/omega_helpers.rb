module OmegaHelpers
  def omega_blog_title
    is_blog_article? ?
      ('<h2>' << current_article.title << '</h2>' <<
         'by ' << current_page.data[:author] << ' on ' <<
         current_article.date.strftime('%b %e, %Y at %H:%M:%S')) : ""
  end

  def omega_blog_footer
    link_to '<< back', '/', :class => 'back_link'
  end

  def rjr_link(text)
    link_to text, "http://github.com/movitto/rjr"
  end

  def project_link(text, dir='')
    link_to text, "http://github.com/movitto/omega/tree/master/#{dir}"
  end

  def project_file_link(text, file)
    link_to text, "http://github.com/movitto/omega/blob/master/#{file}"
  end

  def commit_link(text, commit)
    link_to text, "http://github.com/movitto/omega/commit/" + commit
  end

  def post_link(text, post_id)
    link_to text, "/posts/#{post_id}.html"
  end

  def wiki_link(text, page)
    link_to text, "http://github.com/movitto/omega/wiki/#{page}"
  end

  def screenshot_thumb(id, opts={})
    link_to image_tag("/images/screenshots/thumbs/#{id}", opts), "/images/screenshots/#{id}"
  end
end
