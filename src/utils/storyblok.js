import * as React from 'react'

export const useStoryblokEditor = (uid, callback) => {
  const handleInput = React.useCallback(
    (event) => {
      // eslint-disable-next-line no-underscore-dangle
      if (event.story.content._uid === uid) {
        const newContent = window.storyblok.addComments(event.story.content, event.story.id)
        callback(newContent)
      }
    },
    [callback, uid],
  )

  React.useEffect(() => {
    if (window.storyblok) {
      window.storyblok.init()
      window.storyblok.on(['change', 'published'], () => window.location.reload())
      window.storyblok.on('input', handleInput)
    }
  }, [handleInput])
}

export const useStoryblok = (page) => {
  const [content, setContent] = React.useState(page?.data?.story?.content)
  // eslint-disable-next-line no-underscore-dangle
  useStoryblokEditor(content._uid, setContent)

  return content
}

export default useStoryblok
