'use client'
import {
    Link,
    NumberInput,
    NumberInputField,
  } from '@chakra-ui/react'

  import React, { useState } from "react";
export default function Check() {
    const [value, setValue] = React.useState('')
    return (
    <>
    <div class="flex h-screen items-center justify-center">

    <h1 className={`text-black text-4xl text-center`}>Result of First Round Selection</h1>
    <NumberInput min={6387001} max={6688299} onChange={(valueString) => setValue(valueString)}>
        <NumberInputField placeholder='Please Enter Your Student ID'/>
    </NumberInput>
    <Link href={`/interviewees/${value}`}>Click here</Link>
    </div>
    </>
    )
  }