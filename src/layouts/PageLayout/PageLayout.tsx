import type { FC, ReactNode } from "react";

import style from './PageLayout.module.scss'

interface Props {
    children?: ReactNode
}

export const PageLayout:FC<Props> = ({children}) => {
    return (
        <div className={style.wrapper}>{children}</div>
    )
}

PageLayout.displayName = 'Page.Layout'