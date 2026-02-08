import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {/* Changed from <ul> to <div> with grid layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              // Changed <li> to a div wrapper (optional, but good for structure) or applied directly to article
              <div key={slug} className="flex"> 
                <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 w-full">
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-6">
                      <div>
                        {/* Date */}
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        
                        {/* Title */}
                        <h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 mt-2">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {title}
                          </Link>
                        </h2>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                        {summary}
                      </div>
                    </div>

                    {/* Read More Link (pushed to bottom) */}
                    <div className="mt-6 text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium pt-8">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
