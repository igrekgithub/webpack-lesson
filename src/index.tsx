import { createRoot } from "react-dom/client"
import { App } from "@/components/App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React, { Suspense } from "react"
import About from "@/pages/about/About"
import Shop from "@/pages/shop/Shop"
import Contacts from "@/pages/contacts/Contacts"
import Suggestions from "@/pages/suggestions/Suggestions"
import { LasyAbout } from "@/pages/about/About.lazy"
import { LazyShop } from "@/pages/shop/Shop.lazy"
import { LasyContacts } from "@/pages/contacts/Contacts.lazy"
import { LasySuggestions } from "@/pages/suggestions/Suggestions.lazy"


const root = document.getElementById('root')

if (!root) { throw new Error('root not found') }

const container = createRoot(root)

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{path: '/about',element:<Suspense fallback={'Loading About... '}><LasyAbout /></Suspense>},
			{path: '/shop',element:<Suspense fallback={'Loading Shop... '}><LazyShop /></Suspense>},
			{path: '/contacts',element:<Suspense fallback={'Loading Contacts... '}><LasyContacts /></Suspense>},
			{path: '/suggestions',element:<Suspense fallback={'Loading Suggestions... '}><LasySuggestions /></Suspense>},
		]
	},
]);


container.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)