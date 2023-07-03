/* eslint-disable sonarjs/cognitive-complexity */
"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment, useState } from "react";

const publishingOptions = [
	{
		title: "Published",
		description: "This blog post can be viewed by anyone who has the link.",
		current: true,
	},
	{
		title: "Draft",
		description: "This job posting will no longer be publicly accessible.",
		current: false,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const content =
		"This is a simple example with a toolbar and the Starter Kit.";

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content,
	});
	const [selected, setSelected] = useState(publishingOptions[0]);
	return (
		<form>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Create Post
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly as your
						post.
					</p>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Post Meta
					</h2>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="title"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Title
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="title"
									id="title"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="slug"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Post Slug
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
										/
									</span>
									<input
										type="text"
										name="username"
										id="username"
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="post-slug"
									/>
								</div>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Category
							</label>
							<div className="mt-2">
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>SEO</option>
									<option>Optimization</option>
									<option>Marketing</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Cover photo
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">
									<PhotoIcon
										className="mx-auto h-12 w-12 text-gray-300"
										aria-hidden="true"
									/>
									<div className="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="region"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Tags
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Post Content
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Write a few sentences about your post. This will appear
						on the post page.
					</p>

					<div className="mt-10 space-y-10">
						<RichTextEditor editor={editor}>
							<RichTextEditor.Toolbar sticky stickyOffset={60}>
								<RichTextEditor.ControlsGroup>
									<RichTextEditor.Bold />
									<RichTextEditor.Italic />
									<RichTextEditor.Underline />
									<RichTextEditor.Strikethrough />
									<RichTextEditor.ClearFormatting />
									<RichTextEditor.Highlight />
									<RichTextEditor.Code />
								</RichTextEditor.ControlsGroup>

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.H1 />
									<RichTextEditor.H2 />
									<RichTextEditor.H3 />
									<RichTextEditor.H4 />
								</RichTextEditor.ControlsGroup>

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.Blockquote />
									<RichTextEditor.Hr />
									<RichTextEditor.BulletList />
									<RichTextEditor.OrderedList />
									<RichTextEditor.Subscript />
									<RichTextEditor.Superscript />
								</RichTextEditor.ControlsGroup>

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.Link />
									<RichTextEditor.Unlink />
								</RichTextEditor.ControlsGroup>

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.AlignLeft />
									<RichTextEditor.AlignCenter />
									<RichTextEditor.AlignJustify />
									<RichTextEditor.AlignRight />
								</RichTextEditor.ControlsGroup>
							</RichTextEditor.Toolbar>

							<RichTextEditor.Content />
						</RichTextEditor>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
				>
					Cancel
				</button>
				<Listbox value={selected} onChange={setSelected}>
					{({ open }) => (
						<>
							<Listbox.Label className="sr-only">
								Change published status
							</Listbox.Label>
							<div className="relative">
								<div className="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
									<div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm">
										<CheckIcon
											className="-ml-0.5 h-5 w-5"
											aria-hidden="true"
										/>
										<p className="text-sm font-semibold">
											{selected.title}
										</p>
									</div>
									<Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
										<span className="sr-only">
											Change published status
										</span>
										<ChevronDownIcon
											className="h-5 w-5 text-white"
											aria-hidden="true"
										/>
									</Listbox.Button>
								</div>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										{publishingOptions.map((option) => (
											<Listbox.Option
												key={option.title}
												className={({ active }) =>
													classNames(
														active
															? "bg-indigo-600 text-white"
															: "text-gray-900",
														"cursor-default select-none p-4 text-sm",
													)
												}
												value={option}
											>
												{({ selected, active }) => (
													<div className="flex flex-col">
														<div className="flex justify-between">
															<p
																className={
																	selected
																		? "font-semibold"
																		: "font-normal"
																}
															>
																{option.title}
															</p>
															{selected ? (
																<span
																	className={
																		active
																			? "text-white"
																			: "text-indigo-600"
																	}
																>
																	<CheckIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</div>
														<p
															className={classNames(
																active
																	? "text-indigo-200"
																	: "text-gray-500",
																"mt-2",
															)}
														>
															{option.description}
														</p>
													</div>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</div>
		</form>
	);
}
