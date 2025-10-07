import { useEffect, useState } from 'react'
import { api } from './config'

export default function ProductsLite(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    let mounted = true
    api.get('/products/')
      .then(res => { if(mounted){ setProducts(res.data); setLoading(false) } })
      .catch(() => { if(mounted){ setErr('Failed to load products'); setLoading(false) } })
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading products…</div>
  if (err) return <div className="text-danger">{err}</div>

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {(products || []).map(p => <li key={p.id}>{p.name} — ₹{p.price}</li>)}
      </ul>
    </div>
  )
}


