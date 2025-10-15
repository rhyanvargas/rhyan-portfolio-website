import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (sectionIds.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the most visible section
                const visibleSections = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleSections.length > 0) {
                    setActiveId(visibleSections[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: '-20% 0px -20% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1.0]
            }
        );

        // Wait for DOM to be ready, then observe sections
        const timeoutId = setTimeout(() => {
            const elements = sectionIds
                .map(id => document.getElementById(id))
                .filter((el): el is HTMLElement => el !== null);

            elements.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [sectionIds]);

    return activeId;
};