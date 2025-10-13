import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the entry with the highest intersection ratio
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    const mostVisible = visibleEntries.reduce((prev, current) =>
                        current.intersectionRatio > prev.intersectionRatio ? current : prev
                    );
                    setActiveId(mostVisible.target.id);
                } else {
                    // If no sections are intersecting, check scroll position
                    const scrollY = window.scrollY;
                    if (scrollY < 100) {
                        // Near top of page, clear active section
                        setActiveId('');
                    }
                }
            },
            {
                root: null, // relative to the viewport
                rootMargin: '-80px 0px -80px 0px', // Smaller offset
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // Fewer thresholds for better performance
            }
        );

        const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, [sectionIds]);

    return activeId;
};
