import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Component/App'
import ProductContextProvider from './Store/ProductContextProvider'
import CartContextProvider from './Store/CartContextProvider'
import WishlistContextProvider from './Store/WishlistContextProvider'
import CheckoutContextProvider from './Store/CheckoutContextProvider'
import MaincategoryContextProvider from './Store/MaincategoryContextProvider'
import SubcategoryContextProvider from './Store/SubcategoryContextProvider'
import BrandContextProvider from './Store/BrandContextProvider'
import UserContextProvider from './Store/UserContextProvider'
import NewslatterContextProvider from './Store/NewslatterContextProvider'
import ContactContextProvider from './Store/ContactContextProvider'
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <>
        <ProductContextProvider>
            <CartContextProvider>
                <WishlistContextProvider>
                    <CheckoutContextProvider>
                        <MaincategoryContextProvider>
                            <SubcategoryContextProvider>
                                <BrandContextProvider>
                                    <UserContextProvider>
                                        <NewslatterContextProvider>
                                            <ContactContextProvider>
                                                <App />
                                           </ContactContextProvider>
                                        </NewslatterContextProvider>
                                    </UserContextProvider>
                                </BrandContextProvider>
                            </SubcategoryContextProvider>
                        </MaincategoryContextProvider>
                    </CheckoutContextProvider>
                </WishlistContextProvider>
            </CartContextProvider>
        </ProductContextProvider>
    </>
)