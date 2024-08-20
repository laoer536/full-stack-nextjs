import React from 'react'
import styles from './index.module.scss'

export interface ArticleCardProps {
  username: string
  title: string
  content: string
  updatedAt: string
}
const ArticleCard = ({ username, title, content, updatedAt }: ArticleCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.username}>
          <span>Author: </span>
          {username}
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.updatedAt}>Updated at: {updatedAt}</div>
      </div>
    </div>
  )
}

export default ArticleCard
