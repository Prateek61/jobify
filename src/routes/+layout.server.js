export async function load() {
    const res = await fetch('https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json')
    const data = await res.json()

    return {
        jobs: data
     }

}