'use client'
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityApp() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/game/Build/WebGL.loader.js",
    dataUrl: "/game/Build/WebGL.data",
    frameworkUrl: "/game/Build/WebGL.framework.js",
    codeUrl: "/game/Build/WebGL.wasm",
  });

  return <Unity unityProvider={unityProvider} style={{ width: '100%', height: '200' }}/>;
}

export default function Game() {
  const path = '/asset/TemplateData/';

  const favicon = path+'favicon.ico';
  const unityLogoDark = path+'unity-logo-dark.png';
  const progressBarEmptyDark = path+'progress-bar-empty-dark.png';

  return (
    <>
    <title>Game - Welcome Freshy - ICT21</title>
    <div className='w-screen h-full flex flex-col items-center justify-center md:'>
      <UnityApp/>
      <h1 className='text-white'>Playing the game and submit your student ID including your record means that you accept and agree with the <a href='/privacy-policy' className='text-[#00FF66] '>Privacy Policy</a> and <a href='/terms' className='text-[#00FF66]'>Terms of Use</a>.</h1>
    </div>
    </>
  )
}
