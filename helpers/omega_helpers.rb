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

  def commit_link(text, commit)
    link_to text, "http://github.com/movitto/omega/commit/" + commit
  end

  def screenshot_thumb(id, opts={})
    link_to image_tag("/images/screenshots/thumbs/#{id}", opts), "/images/screenshots/#{id}"
  end
end
