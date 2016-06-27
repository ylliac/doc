# Domain Driven Design - Design stratégique

## Bounded context

Lié au métier. Parfois plusieurs par application si plusieurs métiers.

![BC](BC.PNG)

## Context mapping

![mapping](mapping.PNG)
![mapping2](mapping2.PNG)


### Communication Upstream / Downstream

Une relation entre deux équipes : L’équipe en amont (upstream) / L’équipe en aval (downstream).

Les actions de l’équipe en amont affecte l’équipe en aval. Mais les actions de l’équipe en aval n’affecte pas les actions de l’équipe en amont.

C’est la métaphore de la rivière : "Si vous êtes en amont et vous polluer la rivière, les personnes en aval vont être impactées. L’inverse n’est pas vrai".

L’enjeu est de donc de spécifier: 
- Comment l'équipe aval va s'adapter à la production de l'équipe amont
- Comment et dans quelle mesure l'équipe amont devra prendre en compte les besoins de l’équipe aval 

## Mapping Patterns

![mapping_patterns](mapping_patterns.PNG)

### Shared kernel

![shared_kernel](shared_kernel.PNG)

- Les deux équipes (en amont et en aval) se sont mise d’accord sur un sous-domaine du modèle à partager
- Ce modèle commun inclus du code, le modèle de données associé avec la partie du modèle en commun
- La modification de ce modèle commun nécessite la consultation et l’accord des deux équipes simultanément
- En terme d’intégration, dès que le shared model est modifié, on doit rejouer les tests sur les deux autres BC

### Customer / Supplier

![customer_supplier](customer_supplier.PNG)

Le Customer/Supplier Pattern correspond au cas où nous avons partitionner notre système en par exemple deux sous-système avec le principe suivant :
- Le système en amont nourrit le système en aval
- Le second système, le système en aval exploite des fonctionnalités du premier système

Les deux sous-systèmes exploitent généralement des fonctionnalités différentes.









