import Layout from '../../components/Layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import styles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({
  postData
}: {
    postData: {
      title: string
      date: string
      contentHtml: string
    }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={styles.headingXl}>{postData.title}</h1>
      <div className={styles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}
