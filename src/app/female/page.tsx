"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FileText, Phone, Mail, Video, Figma, Code, Sparkles, Send, Briefcase } from "lucide-react";
import Link from "next/link";
import SakuraBackground from "@/components/female/SakuraBackground";
import SocialKeyboard from "@/components/female/SocialKeyboard";

function FemalePortfolioPage() {
  React.useEffect(() => {
    document.title = "Syeda Zubia Areej | AI & Video Editor Portfolio";
    document.body.classList.add("female-page");
    return () => {
      document.body.classList.remove("female-page");
    };
  }, []);

  return (
    <SmoothScroll>
      <AnimatedBackground />
      <SakuraBackground />
      <SocialKeyboard />
      <main className="female-theme bg-transparent canvas-overlay-mode text-[#3e1b24] min-h-screen relative font-sans">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative w-full min-h-screen flex items-center justify-center pt-24 px-4 md:px-8 xl:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left z-10"
            >
              <span className="text-pink-600 font-semibold tracking-wider text-sm md:text-base uppercase flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Sparkles size={16} /> Hi, I am
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display tracking-tight text-[#2d0f17] mb-2 leading-none">
                Syeda Zubia Areej
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-medium text-pink-700 mb-6 font-display italic">
                AI / Video Editor
              </h2>
              
              {/* Bullets/Tags from Screenshot */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 max-w-xl">
                {["Student", "Aspiring Entrepreneur", "Business & Design Enthusiast", "Creative Problem Solver"].map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    className="bg-pink-100/70 border border-pink-200 text-[#5a1e2d] hover:bg-pink-200/50 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#contact">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-pink-300 transition-all duration-300 flex items-center gap-2">
                    <Send size={18} /> Hire Me
                  </Button>
                </Link>
                <div className="flex gap-2 justify-center">
                  <a href="mailto:zubiaareej2@gmail.com">
                    <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full p-4 h-12 w-12 flex items-center justify-center">
                      <Mail size={20} />
                    </Button>
                  </a>
                  <a href="tel:+919100805104">
                    <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full p-4 h-12 w-12 flex items-center justify-center">
                      <Phone size={20} />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="w-full py-24 px-4 md:px-8 xl:px-24 bg-white/40 backdrop-blur-sm relative z-10 border-t border-pink-100/50">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-[#2d0f17] mb-3">Creative Tech Stack</h2>
              <p className="text-pink-700 max-w-lg mx-auto font-medium">My toolkit for blending media, design, and intelligent automation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Video Editing */}
              <Card className="bg-white/80 border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="bg-pink-100 text-pink-700 p-2.5 rounded-lg"><Video size={24} /></div>
                  <CardTitle className="text-xl text-[#2d0f17]">Video Production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-pink-900/70">Professional post-production, dynamic editing, and visual effects.</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Adobe Premiere Pro", "After Effects", "CapCut", "Color Grading", "Audio Design"].map((item) => (
                      <Badge key={item} variant="secondary" className="bg-pink-50 text-pink-800 border-none">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Design */}
              <Card className="bg-white/80 border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="bg-pink-100 text-pink-700 p-2.5 rounded-lg"><Figma size={24} /></div>
                  <CardTitle className="text-xl text-[#2d0f17]">UI/UX & Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-pink-900/70">Designing beautiful user experiences and premium brand identities.</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Figma", "Photoshop", "UI Design", "Visual Identity", "Wireframing"].map((item) => (
                      <Badge key={item} variant="secondary" className="bg-pink-50 text-pink-800 border-none">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tech & AI */}
              <Card className="bg-white/80 border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="bg-pink-100 text-pink-700 p-2.5 rounded-lg"><Code size={24} /></div>
                  <CardTitle className="text-xl text-[#2d0f17]">AI & Automation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-pink-900/70">Leveraging AI systems and scripting to automate media assets workflows.</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Python", "Generative AI", "LLM Prompting", "Video AI", "Workflow Scripting"].map((item) => (
                      <Badge key={item} variant="secondary" className="bg-pink-50 text-pink-800 border-none">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="w-full py-24 px-4 md:px-8 xl:px-24 relative z-10">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-[#2d0f17] mb-3">Journey & Projects</h2>
              <p className="text-pink-700 max-w-lg mx-auto font-medium">Combining academia, freelancing, and leadership.</p>
            </div>

            <div className="space-y-8 relative">
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-pink-200 hidden md:block -translate-x-1/2" />
              
              {/* Item 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-white border-pink-100 shadow-sm hover:border-pink-200 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-bold text-[#2d0f17] flex items-center gap-2">
                          <Briefcase size={20} className="text-pink-600" /> Freelance AI & Video Producer
                        </CardTitle>
                        <div className="text-sm font-medium text-pink-700">Self-Employed</div>
                      </div>
                      <Badge className="w-fit bg-pink-50 text-pink-800 hover:bg-pink-100/50 border border-pink-200 rounded-full font-mono text-xs">
                        2025 - Present
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base text-pink-950/80 leading-relaxed">
                      <li>Designed and edited high-performing promotional video campaigns for startup brands.</li>
                      <li>Streamlined workflows by developing custom scripts utilizing local LLMs and AI translation to generate smart captions and multi-lingual voiceovers.</li>
                      <li>Delivered optimized digital assets resulting in increased target audience engagement and retention.</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Item 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-white border-pink-100 shadow-sm hover:border-pink-200 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-bold text-[#2d0f17] flex items-center gap-2">
                          <Sparkles size={20} className="text-pink-600" /> Creative Brand Identity Lead
                        </CardTitle>
                        <div className="text-sm font-medium text-pink-700">Media Group</div>
                      </div>
                      <Badge className="w-fit bg-pink-50 text-pink-800 hover:bg-pink-100/50 border border-pink-200 rounded-full font-mono text-xs">
                        2025 - 2026
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base text-pink-950/80 leading-relaxed">
                      <li>Led the visual branding for student entrepreneurship summits and design showcases.</li>
                      <li>Created UI prototypes, banners, and layout mockups in Figma for event websites.</li>
                      <li>Collaborated with tech development teams to ensure precise translations of UI mockups into frontend code.</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="w-full py-24 px-4 md:px-8 xl:px-24 bg-white/40 backdrop-blur-sm relative z-10 border-t border-pink-100/50">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-[#2d0f17] mb-3">Featured Creations</h2>
              <p className="text-pink-700 max-w-lg mx-auto font-medium">A selection of my branding systems, videos, and scripts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Project 1 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="h-48 bg-pink-100 flex items-center justify-center p-6 text-[#c46851] relative">
                  <Video size={48} className="stroke-1" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-pink-800">
                    Video Editing
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2d0f17] mb-2">AI Video Editing Reel</h3>
                    <p className="text-sm text-pink-950/70 mb-4">A complete video showreel displaying dynamic pacing, visual effects overlays, and color correction systems tailored for tech presentations.</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-pink-200 text-pink-800">Premiere Pro</Badge>
                    <Badge variant="outline" className="border-pink-200 text-pink-800">After Effects</Badge>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="h-48 bg-[#ebd8d4] flex items-center justify-center p-6 text-[#c46851] relative">
                  <Figma size={48} className="stroke-1" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-pink-800">
                    UI Design
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2d0f17] mb-2">Modern Branding & UI System</h3>
                    <p className="text-sm text-pink-950/70 mb-4">A sleek Figma design system for a creative portfolio site, featuring custom color tokens, organic curved backgrounds, and typography guidelines.</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-pink-200 text-pink-800">Figma</Badge>
                    <Badge variant="outline" className="border-pink-200 text-pink-800">Branding</Badge>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="h-48 bg-pink-100/50 flex items-center justify-center p-6 text-[#c46851] relative">
                  <Code size={48} className="stroke-1" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-pink-800">
                    Automation
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2d0f17] mb-2">AI Subtitle Automator</h3>
                    <p className="text-sm text-pink-950/70 mb-4">A Python-based utility script that coordinates speech-to-text libraries and auto-generates styled caption layers ready to be burned into video tracks.</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-pink-200 text-pink-800">Python</Badge>
                    <Badge variant="outline" className="border-pink-200 text-pink-800">Speech-To-Text</Badge>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-24 px-4 md:px-8 xl:px-24 relative z-10 border-t border-pink-100/50">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-[#2d0f17] mb-3">Get in Touch</h2>
              <p className="text-pink-700 max-w-lg mx-auto font-medium">Let&apos;s build or design something amazing together.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Details card */}
              <div className="md:col-span-5 bg-white border border-pink-100 p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-bold text-[#2d0f17] mb-4">Contact Details</h3>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 text-pink-700 p-3 rounded-full"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs text-pink-700 uppercase tracking-wider font-semibold">Email</p>
                    <a href="mailto:zubiaareej2@gmail.com" className="text-sm font-medium hover:underline text-[#2d0f17]">
                      zubiaareej2@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 text-pink-700 p-3 rounded-full"><Phone size={18} /></div>
                  <div>
                    <p className="text-xs text-pink-700 uppercase tracking-wider font-semibold">Phone</p>
                    <a href="tel:+919100805104" className="text-sm font-medium hover:underline text-[#2d0f17]">
                      +91 9100805104
                    </a>
                  </div>
                </div>

                <div className="text-xs text-pink-800/60 leading-relaxed pt-4 border-t border-pink-50">
                  Feel free to reach out via call, email, or by filling the contact form. I will respond to your inquiry as soon as possible!
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-7 bg-white border border-pink-100 p-6 rounded-2xl">
                <ContactForm emailRecipient="zubiaareej2@gmail.com" />
              </div>

            </div>
          </div>
        </section>

      </main>
    </SmoothScroll>
  );
}

export default FemalePortfolioPage;
