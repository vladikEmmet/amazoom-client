import { FC, PropsWithChildren } from "react"
import Notification from "../Notification"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const Layout: FC<PropsWithChildren<unknown>> = ({children}) => {
  return (
    <div>
      <Header />
      <div className="grid" style={{gridTemplateColumns: "1fr 4fr"}}>
          <div>
            <Sidebar />
          </div>
          <main className="p-12 pl-5 mt-[91px]">
              {children}
          </main>
      </div>
      <Notification />
    </div>
  )
}

export default Layout