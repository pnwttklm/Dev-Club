"use client"

import Image from 'next/image';

//Chakra UI
import {
    Button,
    Stack,
    Text,
    Textarea,
    Checkbox,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useToast,
} from '@chakra-ui/react'

import FocusLock from 'react-focus-lock';
import React, { useState } from 'react';

const Form = ({ ClosingPopover }) => {
    const toast = useToast()
    const [Question, setQuestion] = useState('')
    const [Email, setEmail] = useState('')

    // FROM BasicUsage
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [Checked, setChecked] = useState(false)


    async function SendQuestion() {
        const response = await fetch('/api/question&feedback', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: Email, comment: Question , type: 'question'})
        })
        const data = await response.json()
        console.log(data)

        setQuestion('')
        setEmail('')
        setChecked(false)

        toast({
            title: 'Thanks for your question <3',
            description: "We will collect information and answer you within 7 days.",
            status: 'success',
            duration: 3000,
            isClosable: false,
        })
        return "SUCCESS"
    }
    
    return (
      <Stack spacing={4} className='text-xs md:text-base'>
        <div>
            <a className='font-semibold text-md md:text-md'>Question </a>
            <a className='font-semibold text-[#C60000]'>*</a>
            <a className='font-regular text-[#1D1D1F] size-sm'>(English or ภาษาไทย)</a>
        </div>
        <Textarea  value={Question} id='question' resize={("none")} placeholder='Type your questions here!' className={`text-xs md:text-base rounded-2xl`} onChange={(event) => {setQuestion(event.target.value)}}/>
        <p className=' font-semibold'>Email For Replying</p>
        <Input  value={Email} id='email' placeholder='Give us your email here!' className='text-xs md:text-base rounded-2xl' type="email" onChange={(event) => {setEmail(event.target.value)}}/>
        <a className='font-bold text text-xs md:text-sm text-[#1D1D1F] hover:text-[#00FF66] underline underline-offset-1' onClick={onOpen}>
        <Checkbox isChecked={Checked} colorScheme='green' onClick={onOpen} size={{base:'sm', md:'md'}}>
               I agree and acknowledge in the agreement.
        </Checkbox></a>
        
        <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior={'inside'}>
            <ModalOverlay />
            <ModalContent className='rounded-3xl'>
            <ModalHeader>Agreement</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
                <Text>

You hereby give the Developer Team, ICT#20 President Team consent to collect and process your personal information for the purpose of answering question in ICT21 Website. You understand and agree that the information you provide may only be used for the ICT21 Website. 
</Text>

<Text>
Personal information may be collected:</Text>

<Text>1. Email</Text>

<Text>Your personal information will be securely kept by Developer Team, ICT20 President Team and only Developer Team, ICT20 President Team can access to your personal information for one year from the day you submit the question and email.</Text>

<Text>You consent that the personal information you provide may be processed to answer the question you asked.</Text>

<Text>By agree this consent form, you acknowledge that you have read and agree to the information provided above, <a href='/privacy-policy' className='text-[#0047AB] hover:text-[#00FF66]'>privacy policy</a>, and <a href='/terms' className='text-[#0047AB] hover:text-[#00FF66]'>terms and conditions</a>. You also willingly consent to the collection and processing of answering your question purposes.
</Text>
 

<Text>คุณยินยอมให้ทีมนักพัฒนาในประธาน ICT รุ่น 20 เก็บและใช้งานข้อมูลส่วนบุคคลเพื่อใช้สำหรับการตอบกลับคำถามที่คุณถามภายในเว็บไซต์ ICT21 คุณยอมรับและตกลงว่าข้อมูลที่ถูกเก็บนั้นจะใช้สำหรับเว็บไซต์ ICT21 ดังกล่าวเท่านั้น</Text>

<Text>ข้อมูลส่วนบุคคลได้แก่</Text>

 

<Text>1. อีเมล</Text>

<Text>ข้อมูลส่วนตัวดังกล่าวของคุณจะถูกเก็บรักษาอย่างปลอดภัยโดยทีมนักพัฒนาในประธาน ICT รุ่น 20 และมีเพียงทีมนักพัฒนาของประธาน ICT รุ่น 20 เท่านั้นที่สามารถเข้าถึงข้อมูลส่วนตัวดังกล่าวของคุณเป็นเวลาทั้งสิ้นหนึ่งปีนับจากวันที่คุณได้ส่งคำถามและอีเมล</Text>

<Text>คุณยินยอมว่าข้อมูลส่วนบุคคลที่คุณกรอกนั้นจะถูกใช้สำหรับการตอบกลับคำถามที่คุณถามภายในเว็บไซต์ ICT21</Text>

<Text>เมื่อคุณกดเห็นด้วยกับแบบฟอร์มนี้ หมายความว่าคุณเข้าใจและยอมรับนโยบายความเป็นส่วนตัวข้างต้น <a href='/privacy-policy' className='text-[#0047AB] hover:text-[#00FF66]'>นโยบายความเป็นส่วนตัว(Privacy Policy)</a> <a href='/terms' className='text-[#0047AB] hover:text-[#00FF66]'>ข้อกำหนดและเงื่อนไข(Terms and Conditions)</a> และคุณยินยอมการเก็บรวบรวมและใช้งานข้อมูลส่วนตัวของคุณในการตอบกลับคำถามที่คุณถามภายในเว็บไซต์ ICT21
</Text>
            </ModalBody>
            <ModalFooter className=' gap-2'>
                <Button onClick={() => { setChecked(false); onClose()}}>
                    Disagree
                </Button>
                <Button className='bg-[#000000] text-[#F5F5F7] hover:text-[#1D1D1F] hover:bg-[#00FF66]' onClick={() => { setChecked(true); onClose()}}>
                    I agree to the agreement
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        
        <div className='flex w-full justify-center items-center'>
            <Button isDisabled={Question === '' || Checked === false} className=' w-fit rounded-xl font-semibold hover:text-[#FFFFFF] hover:bg-[#000000]' size={{base:'sm', md:'lg'}} variant='outline' 
            onClick = {async function() {
                const res = await SendQuestion()
                if (res == "SUCCESS") {
                    ClosingPopover()
                }
            }}>
            Submit
            </Button>
        </div>
      </Stack>
    )
}

function WalkthroughPopover() {
    return (
      <Popover
        placement='top'
        closeOnBlur={false}
      >
        {({ onClose }) => (
            <>
                <PopoverTrigger>
                    <Button className='mt-16 rounded-full bg-[#00ff66] hover:text-[#f5f5f7] hover:bg-[#1D1D1F]' size={{base:'sm', md:'lg'}}>Ask a Question</Button>
                </PopoverTrigger>
                <PopoverContent color='#1D1D1F' bg='#FFFFFF'  className='rounded-3xl p-3' width={{ base: "sm", md: "md" }}>
                <PopoverHeader pt={4} fontWeight='bold' border='0' className=' 
                text-xs
                md:text-base'>
                    <div className='flex items-center justify-between'>
                        <p>Ask a Question</p>
                        {/* <IconButton variant='unstyled' size='sm' aria-label='close' icon={<BsFillXCircleFill />} onClick={onClose}/> */}
                    </div>
                </PopoverHeader>
                <PopoverArrow bg='#00FF66' />
                <PopoverBody className='
                text-xs
                md:text-base'>
                    <p className='mb-4'>If you have something in your mind and really want to know it, this allows you to ask your questions. Within 7 days, we will answer you via email. Please provide us your email for replying.</p>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <Form ClosingPopover={onClose}/>
                    </FocusLock>
                </PopoverBody>
                </PopoverContent>
            </>
        )}
        </Popover>
    )
}

export default WalkthroughPopover