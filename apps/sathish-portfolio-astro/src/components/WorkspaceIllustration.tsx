import { useEffect, useState } from 'react';

const WorkspaceIllustration = () => {
    const [typingTexts, setTypingTexts] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: ''
    });

    const texts = {
        1: 'DevOS v4.2.0',
        2: 'ThinkPad X1 Carbon',
        3: '5.15.0-dev',
        4: '45 days, 17 hours',
        5: 'JavaScript, Python, Go',
        6: 'VSCode / Neovim',
        7: 'React, Next.js, TailwindCSS'
    };

    useEffect(() => {
        let currentIndex = 1;
        let timeout: NodeJS.Timeout;

        const typeText = (index: number, text: string) => {
            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    setTypingTexts(prev => ({
                        ...prev,
                        [index]: text.substring(0, charIndex + 1)
                    }));
                    charIndex++;
                } else {
                    clearInterval(interval);
                    if (currentIndex < 7) {
                        currentIndex++;
                        timeout = setTimeout(() => {
                            typeText(currentIndex, texts[currentIndex as keyof typeof texts]);
                        }, 300);
                    }
                }
            }, 50);
        };

        timeout = setTimeout(() => {
            typeText(1, texts[1]);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="w-full xl:w-3/4 mx-auto relative mb-12">
            <div className="workspace-container relative w-full aspect-video">
                {/* Neon */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/50 blur-3xl" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/50 blur-3xl" />

                {/* Desk Surface */}
                <div className="absolute -bottom-8 w-full h-40 border-2 border-gray-400 rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 neon-desk" />

                {/* Monitor */}
                <div className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 aspect-video bg-black rounded-lg border border-gray-600 shadow-lg flex mb-24">
                    {/* Monitor Stand */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-1/2 h-4 bg-gray-700 rounded-b-sm" />

                    {/* Monitor Screen */}
                    <div className="flex-1 p-4 bg-gray-700 relative">
                        <div className="absolute inset-2 bg-black rounded border border-gray-700 flex flex-col">
                            <div className="bg-gray-800 p-1 flex items-center gap-1">
                                <div className="flex gap-1 ml-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-400 mx-auto font-code">
                                    john@dev-workspace
                                </div>
                            </div>
                            <div className="p-2 flex-1 font-code text-xs lg:text-sm">
                                <pre className="text-green-500 mt-1">
                                    {`          _____  
     /     \\    `}
                                    <span className="text-yellow-400">
                                        john@dev-workspace
                                    </span>
                                    {`
    | () () |   `}
                                    <span className="text-gray-400">------------------</span>
                                    {`
     \\  ^  /    `}
                                    <span className="text-purple-400">OS:</span>{" "}
                                    <span className="text-gray-300">DevOS v4.2.0</span>
                                    {`
      |||||     `}
                                    <span className="text-purple-400">Host:</span>{" "}
                                    <span className="text-gray-300">
                                        ThinkPad X1 Carbon
                                    </span>
                                    {`
      |||||     `}
                                    <span className="text-purple-400">Kernel:</span>{" "}
                                    <span className="text-gray-300">5.15.0-dev</span>
                                    {`
                `}
                                    <span className="text-purple-400">Uptime:</span>{" "}
                                    <span className="text-gray-300">
                                        45 days, 17 hours
                                    </span>
                                    {`
                `}
                                    <span className="text-purple-400">Languages:</span>{" "}
                                    <span className="text-gray-300">
                                        JavaScript, Python, Go
                                    </span>
                                    {`
                `}
                                    <span className="text-purple-400">Editor:</span>{" "}
                                    <span className="text-gray-300">VSCode / Neovim</span>
                                    {`
                `}
                                    <span className="text-purple-400">Frameworks:</span>{" "}
                                    <span className="text-gray-300">
                                        React, Next.js, TailwindCSS
                                    </span>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Laptop */}
                <div className="absolute top-4/6 right-8 w-2/5 aspect-video animated fadeInRight delay300">
                    <div className="absolute bottom-2 sm:bottom-7 w-full h-4 bg-gray-700 right-0 rounded-b-lg" />
                    <div className="absolute bottom-[calc(25%-1px)] w-full aspect-video bg-gray-700 border border-gray-700 rounded-t-lg flex flex-col px-1">
                        {/* Laptop Frame */}
                        <div className="h-1 bg-gray-700 flex items-center justify-center">
                            <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        </div>

                        {/* VSCode Screen */}
                        <div className="flex-1 bg-black flex">
                            {/* Sidebar */}
                            <div className=" bg-gray-800 flex flex-col items-center justify-start py-1 gap-1">
                                <div className="w-3 h-3 bg-gray-700 rounded" />
                                <div className="w-3 h-3 bg-gray-700 rounded" />
                                <div className="w-3 h-3 bg-green-700 rounded" />
                                <div className="w-3 h-3 bg-gray-700 rounded" />
                            </div>

                            {/* Editor */}
                            <div className="flex-1 p-1">
                                <pre className="font-code text-[0.4rem] lg:text-[0.5rem] leading-tight">
                                    <span className="text-purple-400">import</span>{" "}
                                    <span className="text-blue-400">React</span>{" "}
                                    <span className="text-purple-400">from</span>{" "}
                                    <span className="text-green-400">'react'</span>;
                                    {`

`}
                                    <span className="text-purple-400">const</span>{" "}
                                    <span className="text-yellow-400">DevWorkspace</span> = () =&gt; {"{"}
                                    {`
`}
                                    <span className="text-purple-400">const</span> [
                                    <span className="text-blue-400">isLoading</span>,{" "}
                                    <span className="text-blue-400">setIsLoading</span>] ={" "}
                                    <span className="text-yellow-400">React</span>.
                                    <span className="text-blue-400">useState</span>(
                                    <span className="text-orange-400">true</span>);
                                    {`

`}
                                    <span className="text-purple-400">React</span>.
                                    <span className="text-blue-400">useEffect</span>(() =&gt; {"{"}
                                    {`
`}
                                    <span className="text-purple-400">const</span>{" "}
                                    <span className="text-blue-400">timer</span> ={" "}
                                    <span className="text-blue-400">setTimeout</span>(() =&gt; {"{"}
                                    {`
  `}
                                    <span className="text-blue-400">setIsLoading</span>(
                                    <span className="text-orange-400">false</span>);
                                    {`
}, `}
                                    <span className="text-orange-400">2000</span>);
                                    {`

`}
                                    <span className="text-purple-400">return</span> () =&gt;{" "}
                                    <span className="text-blue-400">clearTimeout</span>(
                                    <span className="text-blue-400">timer</span>);
                                    {`
}, []);`}
                                    {`

`}
                                    <span className="text-purple-400">return</span> (
                                    {`
`}
                                    &lt;<span className="text-blue-400">div</span>{" "}
                                    <span className="text-yellow-400">className</span>=
                                    <span className="text-green-400">"workspace"</span>&gt;
                                    {`
  {`}
                                    <span className="text-blue-400">isLoading</span> ? (
                                    {`
    `}
                                    &lt;<span className="text-blue-400">LoadingScreen</span>{" "}
                                    /&gt;
                                   
  
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Notes */}
                <div
                    className="absolute top-16 left-12 w-12 h-12 bg-yellow-200 rounded"
                    style={{ transform: "rotate(-15deg)" }}
                >
                    <div className="w-full h-full p-1">
                        <div className="w-full text-center text-gray-800 font-bold text-[0.4rem] lg:text-[0.5rem]">
                            TODO:
                        </div>
                        <div className="w-full text-center text-gray-800 text-[0.4rem] leading-tight">
                            Fix navbar bug
                        </div>
                    </div>
                </div>

                {/* Coffee Cup */}
                <div className="absolute -bottom-4 md:-bottom-2 left-10 w-12 h-16 animated fadeInUp delay100">
                    <div className="absolute -right-4 top-6 h-8 w-8 border-4 border-gray-700 rounded-r-full" />
                    <div className="absolute bottom-0 w-full h-10 bg-gray-700 rounded-b-lg" />
                    <div className="absolute bottom-8 w-full h-8 bg-gray-600 rounded-lg">
                        <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900" />
                    </div>
                    <div className="absolute w-6 h-1 bg-white/20 left-3 top-3 rounded" />
                    <div className="absolute w-1.5 h-4 bg-white/30 left-4 -top-2 rounded steam" />
                    <div className="absolute w-1.5 h-4 bg-white/30 left-6 -top-4 rounded steam" />
                    <div className="absolute w-1.5 h-4 bg-white/30 left-8 -top-3 rounded steam" />
                    <div className="absolute left-2 bottom-3 text-[8px] tracking-widest">
                        COFFEE
                    </div>
                </div>

                {/* Extra Sticky Note */}
                <div
                    className="absolute top-32 left-12 w-12 h-12 bg-blue-200 rounded max-sm:hidden"
                    style={{ transform: "rotate(10deg)" }}
                >
                    <div className="w-full h-full p-1">
                        <div className="w-full text-center text-gray-800 font-bold text-[0.4rem] lg:text-[0.5rem]">
                            IDEA:
                        </div>
                        <div className="w-full text-center text-gray-800 text-[0.4rem] leading-tight">
                            New portfolio
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceIllustration;