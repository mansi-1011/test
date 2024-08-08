import { useCallback, useEffect } from 'react'
import Axios from 'axios'
import env from '../../env.json'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AdminsetIsLoggedIn, AdminsetUser } from '../../redux/slices/AdminUserSlice'

export default function Auth({ children }) {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const ChkAdmin = useCallback(() => {
        Axios
            .get(`${env.API_URL}/user/check-admin`, {
                headers: {
                    'x-access-token': localStorage.getItem('user') || '',
                }
            })
            .then(res => {
                if (res.data.user) {
                    dispatch(AdminsetIsLoggedIn(true))
                    dispatch(AdminsetUser(res.data.userData))
                } else {
                    dispatch(AdminsetIsLoggedIn(false))
                    navigate('/admin')
                }
            })
            .catch(err => console.error(err))
    }, [dispatch , navigate])

    useEffect(() => {
        ChkAdmin()
    }, [ChkAdmin])

    return (children)
}