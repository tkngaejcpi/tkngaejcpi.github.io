---
title: 'Introduction to Local Affine Transformation'
createdDate: 2024-12-11
tags: ['primer']
---

**What is an affine transformation?**

An affine transformation is a composition of linear transformation and translation.

If you apply linear transform $A$ to $\vec{x}$ first,
and apply translation $\vec{b}$ then,
you can get the result of the affine transformation from:

$$
\left(
\begin{matrix}
\vec{y} \\
1
\end{matrix}
\right)

=

\left(
\begin{matrix}
A & \vec{b} \\
0 & 1
\end{matrix}
\right)

\left(
\begin{matrix}
\vec{x} \\
1
\end{matrix}
\right)
$$

---

**How does an local affine transformation work instinctly?**

Assume you want to apply serveral affine transformations $T_i(x)$ to different parts $U_i$ in the coordinate.

The local affine transformation applies affine transformations locally,
and "distort" the other parts besides $U_i$ according to their distances to the regions.

---

**What is an local affine transformation mathematically?**

Let $d_i(x)$ be the distance from $x$ to $U_i$,
the weights are:

$$
w_i(x) = \frac{1/d_i(x)^e}{\sum_i (1 / d_i(x)^e)}
$$

Then, the local affine transformation is:

$$
T(x)
= \begin{cases}
T_i(x) & x \in U_i \\
\sum_i w_i(x) T_i(x) & \text{otherwise}
\end{cases}
$$

---

**How do you implement local affine transformation in Python?**

<details>

<summary>Code</summary>

```python
def apply_local_affine_transformation(affine_matrices, region_predicates, distance_functions, point):
  """
  :param affine_matrices: a list of affine matrices
  :param region_predicates: a list of functions that tell if the point is in the corresponding region
  :param distance_functions: a list of distance functions that take a point and return the distance from the point to the region
  :param point: the point should be transformed
  :return: transformed point
  """

  # preparation
  n = len(region_predicates)

  padded_point = np.concatenate((point, np.array([[1]])))

  # extract the matrices that the point is in its region
  matched_affine_matrices = [affine_matrices[i] for i in range(n) if region_predicates[i](point)]

  # if the point is in some region
  if(len(matched_affine_matrices) > 0):
    matched_affine_matrix = matched_affine_matrices[0]
    result = np.matmul(matched_affine_matrix, padded_point)

    return result[0:-1, :]

  # otherwise
  distance_reciprocals = [1 / distance_functions[i](point) for i in range(n)]
  sum_of_distance_reciprocals = sum(distance_reciprocals)

  weights = [distance_reciprocals[i] / sum_of_distance_reciprocals for i in range(n)]

  results = [weights[i] * np.matmul(affine_matrices[i], padded_point) for i in range(n)]

  return sum(results)[0:-1, :]
```

</details>

---

**How do you actually apple an local affine transformation to transform an image?**

For all pixels in the image,
you can apply the inverse transformation $T^{-1}$ to the coordinate $y$,
to solve the coordinate $x$ before the transformation.

The result $x$ may not be an integer coordinate,
you can use bilinear interpolation to figure out the approximate brightness of $x$.

The inverse transformation $T^{-1}$ is just the transformation replacing all affine matrices to their inverse.
