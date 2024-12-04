import { BackgroundBeams } from "../ui/background-beams";
import { Button } from "../ui/button";


export default function HeroSection() {
    return (
        <>
            <section>
                <div className="min-h-[100dvh] w-full relative z-10 flex flex-col items-center justify-center py-20 px-6">
                    <h1 className="text-5xl font-extrabold text-center">
                        A digital passport for your products
                    </h1>
                    <p className="text-lg text-center mt-4 max-w-[1200px]">
                        Prismia is a blockchain-based platform that allows manufacturers to create digital passports for their products. These passports can be used to track every stage of the product&apos;s journey helping to boost sustainability, compliance, and trust through accessible, detailed data.
                    </p>
                    <Button className="mt-8">
                        Get started
                    </Button>
                </div>
                <BackgroundBeams />
            </section>
        </>
    )
}

