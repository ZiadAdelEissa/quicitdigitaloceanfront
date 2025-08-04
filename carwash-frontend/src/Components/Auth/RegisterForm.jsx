import { useState } from 'react'
import { registerCustomer } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function RegisterForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useAnimation('form')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerCustomer(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form w-full h-full bg-[#171717]'>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#fff]  mb-5 rounded-lg shadow-md shadow-fuchsia-900 hover:shadow-gray-900  animate-fade-in mt-[130px]">
      <h2 className="text-2xl font-bold mb-6 text-center">{t("register.Registration")}</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="mb-4">
        <label className="block text-black mb-2" htmlFor="name">{t("register.name")}</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
          />
      </div>
      
      <div className="mb-4">
        <label className="block text-black mb-2" htmlFor="email">{t("login.email")}</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
          required
          />
      </div>
      
      <div className="mb-4">
        <label className="block text-black mb-2" htmlFor="password">{t("login.password")}</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 border rounded"
          required
          />
      </div>
      
      <div className="mb-6">
        <label className="block text-black mb-2" htmlFor="phone">{t("register.phone")}</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-2 border rounded"
          required
          />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
        {loading ? t('register.loading') : t('register.submit')}
      </button>
    </form>
        </div>
  )
}