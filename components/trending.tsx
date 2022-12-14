import Link from "next/link"
import { Product } from "types"

const Trending = ({Allproducts}: {Allproducts: Product[]}) => {
    return (
        <section aria-labelledby="trending-heading">
            <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
                <div className="md:flex md:items-center md:justify-between">
                    <h2
                        id="favorites-heading"
                        className="text-2xl font-extrabold tracking-tight text-gray-900"
                    >
                        Trending Products
                    </h2>
                    <a
                        href="#"
                        className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
                    >
                        Shop the collection<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {Allproducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                <Link href={product.href}>
                                    {product.name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {product.price}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-sm md:hidden">
                    <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Shop the collection<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Trending