module OmegaHelpers
  def omega_blog_title
    is_blog_article? ?
      ('<h2>' << current_article.title << '</h2>' <<
         current_page.data[:author] << '-' <<
         current_article.date.strftime('%b %e, %Y')) : ""
  end
end
