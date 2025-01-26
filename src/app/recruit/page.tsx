"use client";
import { GetApplicants } from "@/src/data/get";
import Image from "next/image";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Divider } from "@chakra-ui/react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { BsArrowDownCircleFill } from "react-icons/bs";

export default function HomePage() {
  const data = GetApplicants();
  // const data = [
  //   {
  //     id: 6688123,
  //     nickname: "John",
  //     first_team: "bn",
  //     teams: ["fw", "fm"],
  //     "3-word": "I love coding",
  //     anything: null,
  //   },
  // ];

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (sectionRef.current) {
      try {
        // Capture the component as a canvas
        const canvas = await html2canvas(sectionRef.current, {
          useCORS: true,
          allowTaint: true,
          scale: 2,
        });

        // Convert the canvas to a Blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            const fileName =
              "Dev Club Recruit 2025 " + foundData?.nickname + ".png";
            const file = new File([blob], fileName, { type: "image/png" });

            // Check if the device is mobile and supports navigator.share
            const isMobile = /iPhone|iPad|iPod|Android/i.test(
              navigator.userAgent
            );
            if (
              isMobile &&
              navigator.canShare &&
              navigator.canShare({ files: [file] })
            ) {
              try {
                await navigator.share({
                  files: [file],
                  title: "Shared Component",
                  text: "Check out this captured component!",
                });
                console.log("Shared successfully!");
              } catch (error) {
                console.error("Error while sharing:", error);
              }
            } else {
              // Fallback for desktop or unsupported mobile browsers
              const link = document.createElement("a");
              link.href = URL.createObjectURL(file);
              link.download = fileName;
              link.click();
              console.log("Downloaded successfully!");
            }
          }
        }, "image/png");
      } catch (error) {
        console.error("Error capturing the component:", error);
      }
    }
  };

  const dep = [
    {
      name: "bn",
      title: "Backend",
    },
    {
      name: "fw",
      title: "Frontend Website",
    },
    {
      name: "fm",
      title: "Frontend Mobile",
    },
    {
      name: "gd",
      title: "Game Development",
    },
    {
      name: "uxui",
      title: "UX/UI Design",
    },
    {
      name: "ga",
      title: "Game Artist",
    },
    {
      name: "qa",
      title: "Quality Assurance",
    },
  ];
  const [page, setPage] = useState(0);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [foundData, setFoundData] = useState<any | null>(null);
  const checkId = async (inputId: number) => {
    try {
      const resolvedData = await data; // Wait for the promise to resolve
      const found = resolvedData.find((item: any) => item.id === inputId);

      if (found) {
        setFoundData(found); // Set the whole data when found
        setPage(1);
      } else {
        setPage(500); // If not found, set the page to 500
      }
    } catch (error) {
      console.error("Error resolving data:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const regex = /^[6]\d{1}(88|87)\d{3}$/;

    if (regex.test(value)) {
      setId(value);
      setError("");
      checkId(parseInt(value));
    } else {
      setError("Invalid Student ID");
    }
  };

  function Search() {
    return (
      <div className="items-center justify-center flex flex-col gap-12">
        <DotLottieReact
          src="coffee.lottie"
          loop
          autoplay
          className="w-full lg:w-6/12  mr-24"
        />
        <Image src="logo_bb.svg" alt="hero" width={200} height={200} />
        <h1 className="font-bold text-2xl">Schedule the Interview</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          onKeyDown={(e) => (e.key === "Enter" ? handleKeyDown(e) : undefined)}
          placeholder="Enter Your Student ID"
          className="w-2/3 lg:w-1/3 p-2 border border-gray-300 rounded-lg"
        />
      </div>
    );
  }

  function Info() {
    function getTeamName(team: string) {
      const found = dep.find((item) => item.name === team);
      return found?.title;
    }
    return (
      <>
        <div
          className="flex flex-col items-center justify-center gap-8 p-8 bg-gradient-to-b from-[#9C58FD] to-[#74DAFF] text-white rounded-3xl shadow-lg max-w-4xl mx-auto"
          ref={sectionRef}
        >
          <div className="items-start w-full">
            <Image
              src="/logo_ww.svg"
              alt="hero"
              className="w-24 h-auto"
              width={100}
              height={100}
              crossOrigin="anonymous"
            />
          </div>
          <DotLottieReact
            src="tree.lottie"
            loop
            autoplay
            className="w-8/12 sm:w-6/12 mb-6"
          />
          <h1 className="text-4xl  text-center">
            Hi <span className="font-bold">{foundData?.nickname}</span>!
          </h1>
          <p className="text-xl font-medium text-center">
            We hope you&apos;re doing well. Thank you for your interest in the
            Dev Club! You&apos;re just one step away from becoming a member. To
            make sure our club aligns with your goals and can support your
            self-improvement, we would like to schedule an interview. This will
            be a casual conversation where we get to know you better.
          </p>
          <p className="text-xl font-medium text-center">
            Let&apos;s review your information.
          </p>
          <div className="bg-white text-black p-6 rounded-3xl shadow-md lg:w-10/12 mt-6">
            <div className="items-center justify-center flex flex-col gap-4 mt-12">
              <p className="text-xl text-center text-black">
                The team you&apos;re most interested in is:
              </p>
              <div className="bg-[#F7F7F7] w-6/12  p-4 rounded-3xl mt-4">
                <p className="text-center text-2xl font-bold text-yellow-400 mt-2">
                  {getTeamName(foundData?.first_team)}
                </p>
              </div>
              <p className="text-center text-lg mt-2 text-black">
                Great choice!
              </p>
              <p className="text-center text-black mt-4">
                You&apos;re also interested in the following teams:
              </p>
              <p className="text-center text-lg text-black">
                {foundData?.teams
                  .map(getTeamName)
                  .join(", ")
                  .replace(/, ([^,]*)$/, " and $1")}
                .
              </p>
              <Divider className="my-12" />
              <div>
                <h1 className="text-6xl font-black mr-72">“</h1>
                <h1 className="text-4xl font-semibold text-center text-green-600">
                  {foundData?.["3-word"]}
                </h1>
                <h1 className="text-6xl font-black ml-72">”</h1>
              </div>
              <p className="text-center mt-2">
                This three-word phrase best describes you.
              </p>
              {foundData?.anything && (
                <>
                  <p className="text-center text-black">
                    And you&apos;d like to share the following with us:
                  </p>
                  <h3 className="text-2xl font-semibold text-center text-indigo-500 mt-4">
                    {foundData?.anything}
                  </h3>
                </>
              )}
              <p className="text-center text-black my-6">
                We look forward to seeing you at the interview!
              </p>
            </div>
          </div>

          <button
            className="mt-8 px-6 py-3 bg-[#001C26] hover:bg-green-700 text-white font-semibold rounded-full transition-all ease-in-out duration-200"
            onClick={() => setPage(2)}
          >
            Schedule the Interview
          </button>
          <div className="text-right w-full">
            <p>{foundData?.id}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleDownload}
            className="mt-6 px-4 py-2 flex flex-row gap-3 items-center  bg-[#9C58FD] text-white hover:text-[#001C26] hover:border-[#001C26] hover:border-2 rounded-full hover:bg-white transition duration-300"
          >
            <BsArrowDownCircleFill />
            <p>Download as Image</p>
          </button>
        </div>
      </>
    );
  }

  function Checkout() {
    return (
      <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ13PsQ-mR4yBa159qrfe8Rc5aak7NCJqYYj-82virxb1nCd0_aMz_uFIYhVuBnARA49INbkcqZV?gv=true"
        width="100%"
        height="1000"
      ></iframe>
    );
  }

  function Error() {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
        <DotLottieReact
          src="circle.lottie"
          loop
          autoplay
          className="w-8/12 sm:w-6/12 mb-6"
        />
        <p className="text-lg font-semibold text-red-600">
          No Application Found for Student ID:{" "}
          <span className="font-bold">{id}</span>
        </p>
        <button
          onClick={() => setPage(0)}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      {page === 0 && <Search />}
      {page === 1 && <Info />}
      {page === 2 && <Checkout />}
      {page === 500 && <Error />}
    </>
  );
}
