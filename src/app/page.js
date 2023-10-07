"use client"
import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import('../components/index_c/header'))

export default function Home() {
  return (
    <>
      <Header/>
    </>
    
  )
}