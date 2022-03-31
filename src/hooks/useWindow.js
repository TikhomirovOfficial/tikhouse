export default function useWindow (callback) {
    if(typeof window !== 'undefined') {
        callback()
    }
}