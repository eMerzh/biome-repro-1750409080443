import type { Variants } from 'motion/react'

export interface AnimateProps {
    isAnyHovered: boolean
    totalMessages: number
    index: number
    elementRef: HTMLDivElement | null
}

function getPreviousSiblingsHeight(element: HTMLDivElement | null) {
    if (!element) return 0
    let sum = 0
    let sibling = element.previousElementSibling
    if (sibling) {
        sum += sibling.getBoundingClientRect().height // Add the height of each sibling
        sibling = sibling.previousElementSibling
    }
    return sum
}

export const variants: Variants = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: ({ isAnyHovered, totalMessages, index, elementRef }: AnimateProps) => {
        const previousElementsSize = getPreviousSiblingsHeight(elementRef)
        return {
            opacity: 1,
            y: isAnyHovered ? (previousElementsSize ? -previousElementsSize : 0) : -index * 10,
            zIndex: 1000 + (totalMessages - index),
            transition: { type: 'spring', duration: 0.5 },
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
    },
}
