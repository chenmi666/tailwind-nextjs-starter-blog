import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            AI Tools Library
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!posts.length && 'No tools found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-6">
                    <div>
                      <dl>
                        <dt className="sr-only">Added on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <h2 className="mb-3 mt-2 text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                        >
                          {title}
                        </Link>
                      </h2>
                    </div>
                    <div className="prose max-w-none line-clamp-3 text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                  <div className="mt-6 text-base font-medium leading-6">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Read more: "${title}"`}
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-8 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Tools &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
