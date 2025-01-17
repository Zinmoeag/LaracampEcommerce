import useFetcher from '../../Hooks/useFetcher'
import {productShowApi} from '../../Api/apiUrl'
import {useParams} from 'react-router-dom'
import {useState, useMemo} from 'react'


const ProductShow = () => {

	const {code} = useParams();

	const url = useMemo(() => {
		return productShowApi(code.split("_")[1])
	},[code])


	const [quantity, setQuantity] = useState(0)
	const {data,loading,error} = useFetcher(url);
	const pricePerOneItem = data?.price;
	const totalPrice = quantity * pricePerOneItem;




	return (
		<>
			<section>

				{error && error === 404 && (
					<div>404</div>
				)}

				{!error && Object.keys(data).length > 0 && (		
					<div className="flex sm:p-10 p-8 flex-col md:flex-row">

						<div className="flex-none lg:w-[25rem] sm:w-[20rem] flex justify-center mb-8 md:mb-0">
							<div className="lg:w-[20rem] lg:h-[25rem] md:w-[16rem] md:h-[20rem] w-[20rem] h-[25rem]">
								<img 
							     	src="https://i.pinimg.com/564x/c9/07/be/c907be065bfa9de3d57339abfdb0e00b.jpg" 
							     	alt="" 
							     	className="h-full w-full object-cover object-center"
						     	/>
							</div>
						</div>

						<div className='flex-1 text-slate-600'>
							<div>
								<article className="text-slate-900 mb-8 border-b-[0.1rem] pb-4 border-slate-400 text-sm">
										<h3 className='text-slate-900 mb-2 text-2xl'>{data.name}</h3>
										<ul className="flex flex-col gap-2">
											<li className="flex">
												<p className="w-[7rem]">Product Code</p>
												<p>: {data.product_code}</p>
											</li>
											<li className="flex">
												<p className="w-[7rem]">Brand</p>
												<p>: {data.brand.name}</p>
											</li>
											<li className="flex">
												<p className="w-[7rem]">Price</p>
												<p>: {data.price}MMK</p>
											</li>

											<li className="flex">
												<h3 className="text-xl">{data.price}MMK</h3>
											</li>
										</ul>
								</article>


								<div className="lg:w-[25rem] sm:w-[20rem] my-8">

									<form>
										<div className="w-full my-4">
											<h3 className="text-xl text-slate-900">Add To Cart</h3>
											<p className="text-slate-900">Quantity</p>
											<div className='flex gap-[0.25rem] my-4'>
												<button
													type="button" 
													className="bg-white hover:bg-slate-900 hover:text-white border-slate-700 border-[0.1rem] text-slate-900 w-10 h-10"
													onClick = {() => setQuantity(prev => prev+1)}
												> 
													+ 
												</button>

												<input 
													type="text" 
													className="text-center outline-none border-slate-700 border-[0.1rem] flex-1"
													onChange={(e) => setQuantity(Number(e.target.value)? Number(e.target.value) : 0)}
													value={quantity}
												/>

												<button
													type="button" 
													className="bg-white hover:bg-slate-900 hover:text-white border-slate-700 border-[0.1rem] text-slate-900 w-10 h-10"
													onClick = {() => setQuantity(prev => prev <= 0 ? 0 : prev-1)}
												> 
													-
												</button>
											</div>

											<p>Total : <span className="text-blue-700">{totalPrice} MMK</span></p>

											<button
												type="submit"
												className="bg-slate-900 hover:bg-white hover:text-slate-900 border-[0.1rem] border-slate-900 px-4 py-1 text-white w-full mt-4"
											>
												Add To Cart
											</button>
										</div>
									</form>

									<button 
										className="bg-white hover:bg-zinc-900 hover:text-white border-[0.1rem] border-slate-900 text-slate-900 w-full py-2"
									>
									Buy it now
									</button>

								</div>


								<article className="mt-4">
									<h3 className="text-2xl pb-2 text-slate-900">Shipping</h3>
									<p className="text-justify">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus omnis aperiam eum voluptate rerum temporibus maiores ratione, libero est itaque iure. Eum quos incidunt libero ipsam debitis reiciendis blanditiis tempora natus quaerat tempore fugiat, beatae assumenda quo ipsum illo non, consectetur aperiam nisi et omnis cupiditate ad ullam molestiae quasi! Ipsa modi doloribus cum, tempora aut quos temporibus laborum dignissimos repudiandae laudantium totam cupiditate eaque iusto provident, veritatis illo sunt dolorum, qui officiis nostrum corrupti porro sit sed! Repellat possimus veritatis placeat blanditiis saepe nam porro explicabo, id mollitia numquam recusandae, autem accusantium molestias quae dolore rem itaque deleniti quisquam dolores? Perspiciatis reprehenderit voluptate, saepe dolore harum aperiam minus perferendis libero, amet sed officia cumque. Eius voluptatibus rem dolorem, non rerum laboriosam minus eum. Et alias laudantium aliquid corrupti consequuntur ea eveniet, sint corporis maiores modi, officiis quis, odit quo impedit totam cupiditate? Sunt repellat beatae facilis quia maxime necessitatibus architecto sapiente optio dolor nemo. Aspernatur sequi quasi unde fuga, optio, inventore impedit. Aliquam, aut? Recusandae odio deserunt laborum rerum eveniet aliquam rem quis. Voluptas, optio repudiandae pariatur eos! Doloribus alias quae cumque facilis aliquam cupiditate natus obcaecati dolorem laboriosam soluta dicta, tempore quam fuga dolore deleniti veniam rerum provident.
									</p>
								</article>

							</div>
						</div>
					</div>
				)}

			</section>
		</>

	)
}

export default ProductShow;