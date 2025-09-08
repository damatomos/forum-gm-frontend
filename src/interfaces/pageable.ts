interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Pageable {
  page_number: number
  page_size: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}

export interface Page<T> {
  content: T[]
  pageable: Pageable
  last: boolean
  total_pages: number
  total_elements: number
  size: number
  number: number
  sort: Sort
  number_of_elements: number
  first: boolean
  empty: boolean
}
