"use client";

import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface Tabs {
	name: string;
}

const tabs: Tabs[] = [
	{ name: "Published" },
	{ name: "Draft" },
];

interface Posts {
	title: string;
	href: string;
	category: string;
	date: Date;
	banner: string;
	author: string;
	tags: string[];
	isDraft: boolean;
}

const posts: Posts[] = [
	{
		title: "Boost your conversion rate",
		href: "/boost-your-conversion-rate",
		category: "SEO",
		date: new Date("Mar 16, 2020"),
		banner: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		author: "Paul York",
		tags: ["SEO", "Optimization"],
		isDraft: false,
	},
	{
		title: "How to use search engine optimization to drive sales",
		href: "/how-to-use-search-engine-optimization-to-drive-sales",
		category: "Marketing",
		author: "Paul York",
		date: new Date("Mar 10, 2020"),
		banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		tags: ["SEO", "Optimization"],
		isDraft: false,
	},
	{
		title: "Improve your customer experience",
		href: "/improve-your-customer-experience",
		category: "Customer Success",
		author: "Paul York",
		date: new Date("Feb 12, 2020"),
		banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		tags: ["SEO", "Optimization"],
		isDraft: true,
	}
];

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(" ");
}

export default function PostList() {
	const [selected, setSelected] = useState(tabs[0]);
	return (
		<>
			<div className="relative border-b border-gray-200 pb-5 sm:pb-0">
				<div className="md:flex md:items-center md:justify-between">
					<h3 className="text-base font-semibold leading-6 text-gray-900">
						Posts
					</h3>
					<div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
						<a
							type="button"
							className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							href="/dashboard/posts/create"
						>
							Create
						</a>
					</div>
				</div>
				<div className="mt-4">
					<div className="sm:hidden">
						<label htmlFor="current-tab" className="sr-only">
							Select a tab
						</label>
						<select
							id="current-tab"
							name="current-tab"
							className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
							defaultValue={selected.name}
						>
							{tabs.map((tab) => (
								<option key={tab.name}>{tab.name}</option>
							))}
						</select>
					</div>
					<div className="hidden sm:block">
						<nav className="-mb-px flex space-x-8">
							{tabs.map((tab) => (
								<button
									key={tab.name}
									className={classNames(
										tab == selected
											? "border-indigo-500 text-indigo-600"
											: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
										"whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium",
									)}
									aria-current={
										tab == selected ? "page" : undefined
									}
									onClick={() => setSelected(tab)}
								>
									{tab.name}
								</button>
							))}
						</nav>
					</div>
				</div>
			</div>
			<div>
				<ul role="list" className="divide-y divide-gray-100">
					{posts.filter((cond) => {
						if (selected.name == "Draft")
							return cond.isDraft == true;
						else if (selected.name == "Published")
							return cond.isDraft == false;
					} ).map((post) => (
						<li
							key={post.title}
							className="flex justify-between gap-x-6 py-5"
						>
							<div className="flex gap-x-4">
								<img
									className="h-12 w-12 flex-none rounded-full bg-gray-50"
									src={post.banner}
									alt=""
								/>
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										<a
											href={post.href}
											className="hover:underline"
										>
											{post.title}
										</a>
									</p>
									<p className="mt-1 flex text-xs leading-5 text-gray-500">
										{
										post.tags.map((tag) => (
											<span
												key={tag}
												className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
											>
												{tag}
											</span>
										))
										}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-x-6">
								<div className="hidden sm:flex sm:flex-col sm:items-end">
									<p className="text-sm leading-6 text-gray-900">
										{post.category}
									</p>
									{post.date ? (
										<p className="mt-1 text-xs leading-5 text-gray-500">
											Last seen{" "}
											<time
												dateTime={
													post.date.toISOString()
												}
											>
												{post.date.toDateString()}
											</time>
										</p>
									) : (
										<div className="mt-1 flex items-center gap-x-1.5">
											<div className="flex-none rounded-full bg-emerald-500/20 p-1">
												<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
											</div>
											<p className="text-xs leading-5 text-gray-500">
												Online
											</p>
										</div>
									)}
								</div>
								<Menu as="div" className="relative flex-none">
									<Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
										<span className="sr-only">
											Open options
										</span>
										<EllipsisVerticalIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(
															active
																? "bg-gray-50"
																: "",
															"block px-3 py-1 text-sm leading-6 text-gray-900",
														)}
													>
														Edit
														<span className="sr-only">
															, {post.title}
														</span>
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(
															active
																? "bg-gray-50"
																: "",
															"block px-3 py-1 text-sm leading-6 text-gray-900",
														)}
													>
														Delete
														<span className="sr-only">
															, {post.title}
														</span>
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
