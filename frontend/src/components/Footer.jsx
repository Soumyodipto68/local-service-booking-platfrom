import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-slate-800 px-6 md:px-10 py-10">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-white mb-2">
              ServicePoint
            </h2>

            <p className="text-slate-500">
              Modern Local Service Platform
            </p>

          </div>

          <p className="text-slate-500 text-center">

            © 2026 Fixora. All rights reserved.

          </p>

        </div>

      </footer>
    </div>
  )
}

export default Footer