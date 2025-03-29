import AnimatedGradient from "../components/AnimatedGradient";
import FeatureCard from "../components/FeatureCard";
import { ArrowRight, Upload, FileCheck, PieChart, Palette, Sliders, PackageCheck, Repeat } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {LogoHeader} from "../components/LogoHeader"
import Footer from "../components/Footer"

export const LandingPage = () => {
    return (
        <div className="-m-14 -mr-64 -ml-64">
            <div className="w-full flex flex-col bg-background text-foreground">
                {/* Hero Section */}
                <LogoHeader/>
                <AnimatedGradient>
                    <section className="pt-32 pb-20 relative">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-blue-900 bg-gradient-to-r from-blue-200 to-blue-400">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-900 mr-2"></span>
                                    Introducing Smart Package Color Validator
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
                                    Ensure Perfect Color Compliance for Your Brand Packaging
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground animate-slide-up animation-delay-100">
                                    Verify packaging colors against brand standards with precision, generate comprehensive reports, and track color variations across print batches.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center pt-4 animate-slide-up animation-delay-200">
                                    <Button size="lg" asChild className="bg-blue-900 hover:bg-blue-400 text-white transition-colors">
                                        <Link to="/packaging-color">
                                            Start Validating <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>                              
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedGradient>

                {/* Features Section */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Precision Color Validation for Brand Integrity</h2>
                            <p className="text-lg text-muted-foreground">
                                Our comprehensive toolset ensures your packaging colors adhere to brand standards across all production runs.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard icon={Upload} title="Easy Image Upload" description="Upload your package designs with a simple drag-and-drop interface for instant analysis." />
                            <FeatureCard icon={Palette} title="Color Comparison" description="Compare detected colors against your brand guidelines with detailed ΔE measurements." />
                            <FeatureCard icon={FileCheck} title="Compliance Reports" description="Generate comprehensive reports to document color compliance for all stakeholders." />
                            <FeatureCard icon={PieChart} title="Analytics Dashboard" description="Track color variations across batches and identify trends over time." />
                            <FeatureCard icon={Sliders} title="Adjustable Tolerances" description="Set custom tolerance levels for different colors based on your brand requirements." />
                            <FeatureCard icon={Repeat} title="Batch Processing" description="Analyze multiple package designs simultaneously to improve workflow efficiency." />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 shadow-elevated">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                                        <h2 className="text-3xl font-bold text-white mb-4">Ready to ensure perfect color compliance?</h2>
                                        <p className="text-white/80 mb-8">Start validating your packaging colors today and maintain brand consistency across all your products.</p>
                                        <div className="flex flex-wrap gap-4">
                                            <Button size="lg" variant="secondary" asChild>
                                                <Link to="/packaging-color">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                            </Button>
                                            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                                                <Link to="/guidelines">Learn More</Link>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 p-8 lg:p-16 flex items-center justify-center">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-glass">
                                            <div className="flex items-center justify-center mb-8">
                                                <PackageCheck className="h-16 w-16 text-white" />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-white/80 text-sm"><span>Primary Blue</span><span>ΔE: 0.8</span></div>
                                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: "8%" }} /></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-white/80 text-sm"><span>Accent Red</span><span>ΔE: 2.7</span></div>
                                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: "27%" }} /></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-white/80 text-sm"><span>Neutral Gray</span><span>ΔE: 4.2</span></div>
                                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: "42%" }} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
};
