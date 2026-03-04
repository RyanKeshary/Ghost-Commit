'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Developer = {
    id: string
    name: string
    semester: number
    department: string
    role: string
    skills: string[]
    bio: string
}

const initialDevs: Developer[] = [
    { id: '1', name: 'Alex Chen', semester: 6, department: 'Computer Science', role: 'Full Stack Developer', skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'], bio: 'AI enthusiast looking to build a campus study assistant. I live in the terminal.' },
    { id: '2', name: 'Sarah Miller', semester: 4, department: 'Information Technology', role: 'UI/UX Designer', skills: ['Figma', 'Framer', 'Spline', 'Tailwind', 'Three.js'], bio: 'Designing the next generation of campus social apps. Pixel perfectionist.' },
    { id: '3', name: 'David Kumar', semester: 7, department: 'Electronic Engineering', role: 'Backend Developer', skills: ['Python', 'Django', 'Rust', 'Redis'], bio: 'Working on a smart IoT solution for college labs. Obsessed with low latency.' },
    { id: '4', name: 'Priya Patel', semester: 5, department: 'Computer Science', role: 'Data Scientist', skills: ['PyTorch', 'TensorFlow', 'Pandas', 'SQL'], bio: 'Looking for a frontend savant to help me visualize my predictive models.' },
]

type DevelopersContextType = {
    developers: Developer[]
    addDeveloper: (dev: Developer) => void
    removeDeveloper: (id: string) => void
    updateDeveloperList: (devs: Developer[]) => void
}

const DevelopersContext = createContext<DevelopersContextType | undefined>(undefined)

export function DevelopersProvider({ children }: { children: ReactNode }) {
    const [developers, setDevelopers] = useState<Developer[]>(initialDevs)

    const addDeveloper = (dev: Developer) => {
        setDevelopers(prev => [dev, ...prev])
    }

    const removeDeveloper = (id: string) => {
        setDevelopers(prev => prev.filter(d => d.id !== id))
    }

    const updateDeveloperList = (devs: Developer[]) => {
        setDevelopers(devs)
    }

    return (
        <DevelopersContext.Provider value={{ developers, addDeveloper, removeDeveloper, updateDeveloperList }}>
            {children}
        </DevelopersContext.Provider>
    )
}

export function useDevelopers() {
    const context = useContext(DevelopersContext)
    if (context === undefined) {
        throw new Error('useDevelopers must be used within a DevelopersProvider')
    }
    return context
}
