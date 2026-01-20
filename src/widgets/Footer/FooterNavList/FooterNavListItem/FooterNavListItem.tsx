import type { FC, HTMLAttributes } from "react";
import cn from 'classnames'
import style from './FooterNavListItem.module.scss'

interface Props extends HTMLAttributes<HTMLLIElement> {
    link?: string,
    text: string
}

export const FooterNavListItem:FC<Props> = ({link, text, className, ...props}) => {
    return (
        <li {...props} className={cn(style.item, className)}>
            {link ? <a href={link}>{text}</a> : text}
        </li>
    )
}

FooterNavListItem.displayName = 'Footer.Nav.List.Item'