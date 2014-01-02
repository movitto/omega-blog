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
end
